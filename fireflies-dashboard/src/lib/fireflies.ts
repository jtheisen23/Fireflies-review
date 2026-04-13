import { FirefliesTranscript } from "@/types";

const API_URL = "https://api.fireflies.ai/graphql";

async function query<T>(gql: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FIREFLIES_API_KEY}`,
    },
    body: JSON.stringify({ query: gql, variables }),
  });

  if (!res.ok) {
    throw new Error(`Fireflies API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Fireflies GraphQL error: ${json.errors[0].message}`);
  }
  return json.data;
}

const TRANSCRIPTS_QUERY = `
  query GetTranscripts($fromDate: DateTime, $toDate: DateTime, $limit: Int, $skip: Int) {
    transcripts(
      fromDate: $fromDate
      toDate: $toDate
      limit: $limit
      skip: $skip
      mine: true
    ) {
      id
      title
      dateString: date
      duration
      organizer_email
      meeting_link
      summary {
        short_summary: shorthand_bullet
        keywords
        action_items
      }
      meeting_attendees {
        displayName
        email
      }
      participants
    }
  }
`;

interface TranscriptsResponse {
  transcripts: Array<{
    id: string;
    title: string;
    dateString: string;
    duration: number;
    organizer_email: string;
    meeting_link: string;
    summary: {
      short_summary: string;
      keywords: string[];
      action_items: string;
    } | null;
    meeting_attendees: { displayName: string | null; email: string }[];
    participants: string[];
  }>;
}

export async function getTranscripts(
  fromDate: string,
  toDate: string,
): Promise<FirefliesTranscript[]> {
  const all: FirefliesTranscript[] = [];
  let skip = 0;
  const limit = 50;

  while (true) {
    const data = await query<TranscriptsResponse>(TRANSCRIPTS_QUERY, {
      fromDate,
      toDate,
      limit,
      skip,
    });

    const batch = data.transcripts.map((t) => ({
      id: t.id,
      title: t.title,
      dateString: t.dateString,
      duration: t.duration,
      organizerEmail: t.organizer_email,
      meetingLink: t.meeting_link,
      summary: t.summary,
      meetingAttendees: t.meeting_attendees,
      participants: t.participants,
    }));

    all.push(...batch);

    if (batch.length < limit) break;
    skip += limit;
  }

  return all;
}
