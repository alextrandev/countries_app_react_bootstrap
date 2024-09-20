import { useSelector } from "react-redux"

export default function Favourites() {
  const countries = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);

  return (
    <div>
      {favourites.map((country) => <p>{country}</p>)}
    </div>
  )
}
