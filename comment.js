const fetch = require("node-fetch");
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
    if (workspaceId) {
      formattedTestRunMessage = intl.formatMessage(intl.messages.testRunMessage, {
        link: `https://app.replay.io/team/${workspaceId}/runs/${testRunId}`
      });
    }
  }

  const body = `# [![logo](https://static.replay.io/images/logo-horizontal-small-light.svg)](https://app.replay.io)

  :wave: Hey there! ${intl.formatMessage(intl.messages.summaryMessage, {count: recordings.length}).trim()}
  
  ${formattedTestRunMessage}
  
  ${recordings
    .map(
      ({ id, metadata: { title } }) =>
        `* [${title || id}](https://app.replay.io/recording/${id})`
    )
    .join("\n")}`;

  return github.rest.issues.createComment({
    issue_number,
    owner,
    repo,
    body,
  });
}

module.exports = comment;
