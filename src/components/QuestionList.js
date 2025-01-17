import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({questions, setQuestions}) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
     .then((res) => res.json())
     .then((questions) => setQuestions(questions))
  },[])

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
    <QuestionItem key={question.id} 
    question={question} 
    questions={questions} setQuestions={setQuestions}/>
      
))
  return (
   <div>
    <section>
      <h1>Quiz Questions</h1>
      <ul> 
        {displayQuestions}
        {/* display QuestionItem components here after fetching */}
      </ul>
    </section>
    </div>  
  );
}

export default QuestionList;
// const displayQuestions = questions.map((question) => (
//   <div key={question.id}>
//     <li> {question.prompt}
//       <button onClick={() => handleDeleteClick(question.id)}>Delete Question</button>
//       {/* <label>
//        Correct Answer 
//       <select name="correctIndex" onChange={(e) => handleUpdateAnswer(question.id,e)} value={question.correctIndex}>
//         {question.answers.map((answer, index) => (
//           <option key={index} value={index}>{answer}</option>
//         ))}
//       </select>
//       </label> */}
//     </li>
//    </div> 
// ))