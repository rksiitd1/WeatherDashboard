import WeatherDashboard from '../components/WeatherDashboard';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Weather Dashboard</h1>
      <WeatherDashboard />
    </main>
  );
}