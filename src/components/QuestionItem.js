import React from "react";

function QuestionItem({ question, questions, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = ((id) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE"
     })
     .then (res=> res.json())
     .then (() => handleDeleteQuestion(id))
  })
  const handleDeleteQuestion = ((deletedId) => {
    const upDatedQuestions = questions.filter((question) => question.id !==deletedId)
    console.log("This is the question", question)
    setQuestions(upDatedQuestions)
})
  // console.log("what are the questions now", questions)
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      {<button onClick={() => handleDeleteClick(question.id)}>Delete Question</button> }
    </li>
  );
}

export default QuestionItem;
