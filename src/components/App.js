import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
     .then((res) => res.json())
     .then((questions) => setQuestions(questions))
  },[])

  const handleAddQuestion = ((newData) => {
    setQuestions([...questions,newData])
  }) 

  const handleDeleteQuestion = ((deletedId) => {
     const upDatedQuestions = questions.filter((question) => question.id !==deletedId)
     setQuestions(upDatedQuestions)
 })

 const handleUpdatedCorrectIndex = ((newIndex) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === newIndex.id) {
          return newIndex
      }else{
          return question
      }  
    })
    setQuestions(updatedQuestions)
 })

  const handleDeleteClick = ((id) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE"
     })
     .then (res=> res.json())
     .then (() => handleDeleteQuestion(id))
  })
 
  const handleUpdateAnswer = ((id,e) => {
    console.log(id, e.target.value, )
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify
      (
        {"correctIndex": e.target.value} 
      )
    })
    .then((res) => res.json()) 
    .then((newIndex) => handleUpdatedCorrectIndex(newIndex)) 
  }) 

const displayQuestions = questions.map((question) => (
      <div key={question.id}>
        <li> {question.prompt}
          <button onClick={() => handleDeleteClick(question.id)}>Delete</button>
          <select name="correctIndex" onChange={(e) => handleUpdateAnswer(question.id,e)} value={question.correctIndex}>
            {question.answers.map((answer, index) => (
              <option key={index} value={index}>{answer}</option>
            ))}
          </select>
        </li>
       </div> 
  ))
 
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList displayQuestions={displayQuestions} 
       />}
    </main>
  );
}
export default App;
