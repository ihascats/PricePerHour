export default function Icons() {
  const loading = (
    <svg className="w-12 h-12 fill-neutral-400 loading" viewBox="0 0 24 24">
      <path fill="inherit" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
    </svg>
  );
  const find = (
    <svg className="w-6 h-6 fill-neutral-400" viewBox="0 0 24 24">
      <path fill="inherit" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </svg>
  );
  return { loading, find };
}
