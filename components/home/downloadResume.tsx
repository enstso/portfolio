import { Button } from "@/components/ui/button";
export const DownloadResume = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <a href="/resumeEnstsoJanvier.pdf" target="_blank" rel="noopener noreferrer">
        <Button>Resume</Button>
      </a>
    </div>
  );
};
