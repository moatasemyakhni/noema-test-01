import Form from './Form'
import { AppProvider } from "./contexts/app.provider"

function App() {
  return (
    <AppProvider>
      <div className='md:min-h-screen flex flex-col items-center justify-center justify-items-center max-w-xl m-auto'>
        <img src="https://www.noema.net/images/svg/noema-logo.svg" width={270}  alt="Noema" className='my-5'></img>
        <Form/>
      </div>
    </AppProvider>
  );
}

export default App;
