import Card from "./components/Card";
import LibrarySection from "./components/LibrarySection";

export default function Learn() {
  return (
    <>
      <h1 className="text-4xl my-6 font-bold text-white">Library</h1>

      <LibrarySection title="Mini Stories">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </LibrarySection>

      {/* Continue Studying */}
      <LibrarySection title="Continue Studying">
        <Card />
        <Card />
      </LibrarySection>

      {/* Last Added */}
      <LibrarySection title="Last Added">
        <Card />
        <Card />
      </LibrarySection>
    </>
  );
}
