'use client';

export default function Home() {
  function callDb() {
    console.log('moshi moshi firebase');
  }
  return (
    <>
      <h1>Hello app</h1>
      <button onClick={callDb}>Let&apos;s go</button>
    </>
  );
}
