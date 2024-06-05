import SignUpForm from './components/form/SignUpForm';

function App() {


  return (
      <div className='h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <h1 className='text-white text-8xl font-bold text-center pt-10 animate-bounce'>
          Sign Up!
        </h1>
        <div className='max-w-md mx-auto mt-20 mb-20'>
          <SignUpForm />
        </div>
        <footer className='text-white text-center bg-black h-14 absolute inset-x-0 bottom-0' >
          Melissa Osorio Tavera 2024
        </footer>
      </div>
  );
}

export default App;
