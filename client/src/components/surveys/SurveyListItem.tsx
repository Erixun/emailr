const SurveyListItem = ({ survey, onSurveySelect }: SurveyListItemProps) => {
  const responsesTotal = survey.yes + survey.no;
  const responseRate = Math.trunc(
    (responsesTotal / survey.recipientCount) * 100
  );
  return (
    <div
      className="item"
      onClick={() => {
        onSurveySelect(survey);
      }}
    >
      <div className="card cyan lighten-5">
        <div className="card-content">
          <div className="content">
            <div className="header">Survey title: {survey.title}</div>
            <div className="description">Query: {survey.body}</div>
            <section style={{ margin: "8px 0" }}>
              <div>Responses</div>
              <div
                className="responses red-text text-darken-4"
                style={{ display: "flex", gap: "2rem" }}
              >
                <div>Yes: {survey.yes}</div>
                <div>No: {survey.no}</div>
                <div>Total: {survey.yes + survey.no}</div>
              </div>
            </section>
            <div>Response rate: {responseRate} %</div>

            <div
              className="date"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div>
                Last response at{" "}
                {survey.lastResponded
                  ? new Date(survey.lastResponded).toLocaleDateString()
                  : "unknown date"}
              </div>
              <div>
                Sent out on {new Date(survey.dateSent).toLocaleDateString()} to{" "}
                {survey.recipientCount} recipients
              </div>
            </div>
            {/* <div>Number of recipients: {survey.recipientCount}</div> */}
          </div>
          {/* <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p> */}
        </div>
        {/* <div class="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div> */}
      </div>
      {/* <hr /> */}
    </div>
  );
};

interface SurveyListItemProps {
  survey: Survey;
  onSurveySelect: (survey: Survey) => void;
}

export type Survey = {
  _id: string;
  title: string;
  body: string;
  subject: string;
  // recipients: string;
  recipientCount: number;
  yes: number;
  no: number;
  dateSent: Date;
  lastResponded: Date;
};

export default SurveyListItem;
