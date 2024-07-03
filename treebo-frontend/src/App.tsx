import React from 'react';
import { Add, Checkbox } from 'react-ionicons'
import TaskItem from './components/TaskItem';

const App = () => {
  return (
    <div className="h-screen bg-sky-950 flex justify-center items-center">
     <main className="w-full xl:w-1/3 h-5/6 mx-10 px-2 bg-cyan-100 rounded-md">
     <header className="flex flex-row justify-between">
      <div className="flex flex-row items-center justify-center">
     <Checkbox
     color={'#082f49'}
     height="50px"
     width="50px"
     /> 
     <h1 className="text-3xl text-cyan-950 font-semibold">To-Do App</h1>
     </div>
     <button className="border-solid border-2 hover:opacity-50 border-sky-950 px-4 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold">
     <Add
     color={'#082f49'}
     height="20px"
     width="20px"
     /> 
      Nova Tarefa
     </button>
     </header>
     <div className="w-full h-0.5 bg-sky-950"></div>
     </main>
    </div>
  );
}

export default App;
