import { useMainContext } from "@/lib/hooks";

export function CompletionSlide() {
  const { name } = useMainContext();

  return (
    <div className="relative flex h-full px-8">
      <div className="flex flex-col gap-6">
        <p className="w-full text-lg text-light text-center font-bagoss">
          {`Thanks, ${name}! Now, it’s time to get a reality check.`}
        </p>

        <p className="w-full text-lg text-light text-center font-bagoss">
          This will take 2-3 minutes.
        </p>
      </div>
    </div>
  );
}
