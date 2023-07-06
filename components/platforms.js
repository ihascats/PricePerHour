export default function Platforms({ hltbSelected }) {
  return (
    <div className="bg-neutral-800 text-neutral-400 p-2 font-mono text-sm border-b-2 border-b-neutral-500">
      Platforms:
      <div className="flex flex-wrap gap-1 text-neutral-300">
        {hltbSelected
          ? hltbSelected.profile_platform
              .split(', ')
              .sort(function (a, b) {
                return a.length - b.length;
              })
              .map((platform) => (
                <div className="bg-neutral-700 px-2" key={platform}>
                  {platform}
                </div>
              ))
          : null}
      </div>
    </div>
  );
}
