import  Main from './component/mainpage/mainpage'
import './App.css';


function App() 
{
let mouse={x:0,y:0}
  const darkTheme=window.matchMedia("(prefers-color-scheme: dark)");
  console.log(darkTheme.matches)
  return (
    <Main/>
  );
}

export default App;
