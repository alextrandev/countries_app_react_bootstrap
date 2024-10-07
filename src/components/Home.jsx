import fetchTrivials from '../services/trivialsService';

export default function Home() {
  console.log(fetchTrivials("GND"));
  return (
    <div>Home</div>
  )
}
