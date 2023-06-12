import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  
  const handleAddQuestion = ((newData) => {
    setQuestions([...questions,newData])
  }) 

    return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} setQuestions={setQuestions}
       />}
    </main>
  );
}
export default App;
// const displayQuestions = questions.map((question) => (
//   <div key={question.id}>
//     <li> {question.prompt}
//       <button onClick={() => handleDeleteClick(question.id)}>Delete Question</button>
//       <label>
//        Correct Answer 
//       <select name="correctIndex" onChange={(e) => handleUpdateAnswer(question.id,e)} value={question.correctIndex}>
//         {question.answers.map((answer, index) => (
//           <option key={index} value={index}>{answer}</option>
//         ))}
//       </select>
//       </label>
//     </li>
//    </div> 
// ))