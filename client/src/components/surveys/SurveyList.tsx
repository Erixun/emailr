import { useCallback } from "react";
import { fetchSurveys } from "../../actions";
import SurveyListItem, { Survey } from "./SurveyListItem";
import { DefaultRootState } from "react-redux";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SurveyList = ({ surveys }: { surveys: Survey[] }) => {
  const onSurveySelect = useCallback(() => {
    console.log("useCallback");
  }, []);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const getSortFunction = (sort: string) => {
    switch (sort) {
      case "asc":
        return (a: Survey, b: Survey) =>
          new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime();
      case "desc":
        return (a: Survey, b: Survey) =>
          new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime();
      default:
        return (a: Survey, b: Survey) =>
          new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime();
    }
  };

  const [sort, setSort] = useState("asc");

  const classActive = "white-text teal btn-flat";

  return (
    <div>
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          visibility: surveys.length === 0 ? "hidden" : "visible",
        }}
      >
        <b>You have {surveys.length} surveys available</b>
        <div className="sort">
          Sort by date:{" "}
          <button
            style={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            className={sort === "asc" ? classActive : "btn-flat"}
            onClick={() => setSort("asc")}
          >
            <i className="material-icons">arrow_upward</i>
          </button>
          <button
            style={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            className={sort === "desc" ? classActive : "btn-flat"}
            onClick={() => setSort("desc")}
          >
            <i className="material-icons">arrow_downward</i>
          </button>
        </div>
      </header>
      {surveys.length > 0 ? (
        surveys
          .sort(getSortFunction(sort))
          .map((survey: Survey) => (
            <SurveyListItem
              key={survey._id}
              survey={survey}
              onSurveySelect={onSurveySelect}
            />
          ))
      ) : (
        <div className="center">
          <h4>You have no surveys available</h4>
          <p>
            Feel free to{" "}
            <Link to="/surveys/new" className="orange-text text-darken-4">
              <b>create a new one</b>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state: DefaultRootState & { surveys: Survey[] }) {
  return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
