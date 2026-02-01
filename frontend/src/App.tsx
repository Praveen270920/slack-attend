import HealthCheck from './components/HealthCheck';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <header className="text-center p-8 w-full max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold drop-shadow-lg">
          SlackAttend Health Check
        </h1>
        <HealthCheck />
      </header>
    </div>
  );
}

export default App;

