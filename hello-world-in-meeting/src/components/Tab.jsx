import React from "react";
import { app, teamsCore } from "@microsoft/teams-js";
import MediaQuery from "react-responsive";
import "./App.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
    };
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    app.initialize().then(() => {
      // Notifies that the app initialization is successfully and is ready for user interaction.
      app.notifySuccess();

      // Get the user context from Teams and set it in the state
      app.getContext().then(async (context) => {
        this.setState({
          meetingId: context.meeting.id,
          userName: context.user.userPrincipalName,
        });

        // Enable app caching.
        // App Caching was configured in this sample to reduce the reload time of your app in a meeting.
        // To learn about limitations and available scopes, please check https://learn.microsoft.com/en-us/microsoftteams/platform/apps-in-teams-meetings/app-caching-for-your-tab-app.
        if (context.page.frameContext === "sidePanel") {
          teamsCore.registerOnLoadHandler((context) => {
            // Use context.contentUrl to route to the correct page.
            app.notifySuccess();
          });

          teamsCore.registerBeforeUnloadHandler((readyToUnload) => {
            // Dispose resources here if necessary.
            // Notify readiness by invoking readyToUnload.
            readyToUnload();
            return true;
          });
        }
      });
    });
    // Next steps: Error handling using the error object
  }

  render() {
    let meetingId = this.state.meetingId ?? "";
    let userPrincipleName = this.state.userName ?? "";

    return (
      <div>
        <iframe src="yourcopilot-iframe-link"></iframe>
      </div>
    );
  }
}

export default Tab;
