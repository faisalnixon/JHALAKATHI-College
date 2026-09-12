import HashtagPhotoTable from "../../components/HashtagPhotoTable";

function GeneralPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HashtagPhotoTable
        hashtag="#general"
        title="General"
      />
    </main>
  );
}

export default GeneralPage;