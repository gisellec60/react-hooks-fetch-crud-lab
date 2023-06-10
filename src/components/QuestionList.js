import React, {useState, useEffect} from "react";

function QuestionList({displayQuestions}) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> 
        {displayQuestions}
        {/* display QuestionItem components here after fetching */}
      </ul>
    </section>
  );
}

export default QuestionList;
