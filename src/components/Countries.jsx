import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { initializeCountries } from "../services/countriesServices";

export default function Countries() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(initializeCountries()), [dispatch]);

  return (
    <div>Countries</div>
  )
}
