export default async function Members() {
  await new Promise(resolve => setTimeout(resolve, 3000));

  return <h1>Members Page</h1>;
}
