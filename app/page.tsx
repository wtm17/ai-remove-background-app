import App from "./App";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Remove Background App',
  description: 'App that uses AI to remove background from an image',
}

export default function Home() {
  return (
    <App></App>
  )
}