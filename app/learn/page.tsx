import Card from "./components/Card";
import LibrarySection from "./components/LibrarySection";

export default function Learn() {
  return (
    <>
      <h1 className="text-4xl my-6 font-bold text-white">Library</h1>

      <LibrarySection title="Mini Stories">
        <Card id={0} />
        <Card id={1} />
        <Card id={2} />
        <Card id={3} />
        <Card id={4} />
        <Card id={5} />
        <Card id={6} />
        <Card id={7} />
        <Card id={8} />
        <Card id={9} />
        <Card id={10} />
      </LibrarySection>

      {/* Continue Studying */}
      <LibrarySection title="Continue Studying">
        <Card id={10} />
        <Card id={11} />
      </LibrarySection>

      {/* Last Added */}
      <LibrarySection title="Last Added">
        <Card id={20} />
        <Card id={21} />
        <Card id={22} />
      </LibrarySection>
    </>
  );
}
