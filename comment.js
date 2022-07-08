const fetch = require("node-fetch");
const dedent = require("dedent");
const {createIntl} = require("@formatjs/intl");

async function getWorkspaceId(apiKey) {
  try {
    const resp = await fetch("https://api.replay.io/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        variables: {},
        query: `
          query GetWS {
            viewer {
              user {
                id
              }
            }
            auth {
              workspaces {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await resp.json();

    if (json.errors) {
      throw new Error(errors[0].message);
    } else if (!json.data) {
      throw new Error("No data was returned");
    } else if (json.data.user) {
      return new Error("Unable to return a team for a user API Key");
    }

    const workspaces = json.data.auth.workspaces.edges;
    if (workspaces.length !== 1) {
      // This shouldn't happen because API keys belong to a single workspace
      throw new Error("Multiple teams returned for the provided API key");
    }

    return workspaces[0].node.id;
  } catch (e) {
    console.log((e && e.message) || "Unexpected error retrieving team ID");
    return null;
  }
}

async function comment({
  apiKey,
  context,
  github,
  issue_number,
  recordings,
  summaryMessage,
  testRunId,
  testRunMessage,
}) {
  const {
    repo: { owner, repo },
  } = context;

  const intl = createIntl(
    {
      locale: 'en',
      messages: {
        summaryMessage: {
          id: "summary",
          defaultMessage: summaryMessage
        },
        testRunMessage: {
          id: "test-run",
          defaultMessage: testRunMessage
        },
      },
    }
  )

  if (!issue_number) {
    console.log("No issue number");
    return;
  }

  if (!recordings || recordings.length === 0) {
    console.log("No recordings created");
    return;
  }

  let formattedTestRunMessage = "";
  if (apiKey && testRunId) {
    const workspaceId = await getWorkspaceId(apiKey);
    console.log(">>>>", 1);
    if (workspaceId) {
      console.log(">>>>", 2);
      formattedTestRunMessage = intl.formatMessage(intl.messages.testRunMessage, {
        link: `https://app.replay.io/team/${workspaceId}/runs/${testRunId}`
      });
    }
  }


  console.log({apiKey});
  console.log({testRunId});
  console.log({formattedTestRunMessage});

  // const commitTitle = recordings[0].metadata.source.commit.title;
  const commitId = recordings[0].metadata.source.commit.id;
  const failedRecordings = recordings.filter(r => r.metadata.test.result && r.metadata.test.result !== "passed");
  const passedRecordings = recordings.filter(r => r.metadata.test.result && r.metadata.test.result === "passed");

  const body = dedent`# [![logo](https://static.replay.io/images/logo-horizontal-small-light.svg)](https://app.replay.io)

  **${recordings.length} replays** were recorded for ${commitId}.

  ${generateDetailsString(failedRecordings, false)}
  ${generateDetailsString(passedRecordings, true)}

  ${formattedTestRunMessage}
  `;

  return github.rest.issues.createComment({
    issue_number,
    owner,
    repo,
    body,
  });
}

function generateDetailsString(recordings, isPassed) {
  const summary = isPassed ? 
    dedent`
      <summary>
          <img width="14" alt="image" src="https://user-images.githubusercontent.com/15959269/177834869-851c4e78-e9d8-4ea3-bc1d-5bc372ab593a.png">
          <b>${recordings.length} Passed</b>
        </summary>
    ` : 
    dedent`
      <summary>
        <img width="14" alt="image" src="https://user-images.githubusercontent.com/15959269/177835072-8cafcea8-146d-410a-b02e-321390e8bd95.png">    
        <b>${recordings.length} Failed</b>
      </summary>
    `;
  
  return dedent`
    <details ${!isPassed && "open"}>
      ${summary}
      ${generateRecordingListString(recordings)}
    </details>
  `;
}

function generateRecordingListString(recordings) {
  return dedent`
  <ul>
    ${
      recordings
      .map(
        ({ id, metadata: { title } }) => `<li><a href=https://app.replay.io/recording/${id}>${title || id}</a></li>`
      )
      .join("\n")
    }
  </ul>
  `
}

module.exports = comment;
