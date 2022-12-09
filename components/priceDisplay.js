export default function PriceDisplay({ price }) {
  return (
    <div className="border-b-2 border-b-lime-800">
      {price ? (
        price.discount_percent ? (
          <h1 className="flex gap-2 text-lime-400 font-mono">
            Regular Price:{' '}
            {price ? (
              <p className="text-neutral-50">{price.initial_formatted}</p>
            ) : null}
          </h1>
        ) : null
      ) : null}
      <h1 className="flex gap-2 text-lime-400 font-mono">
        Current Price:{' '}
        {price ? (
          <p className="text-neutral-50">{price.final_formatted}</p>
        ) : null}
        {price ? (
          price.discount_percent ? (
            <p className="text-sm text-neutral-400">
              {price.discount_percent}% off
            </p>
          ) : null
        ) : null}
      </h1>
    </div>
  );
}
