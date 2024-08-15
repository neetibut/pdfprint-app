import Image from "next/image";

const order = {
  date: "Jan 9, 2023",
  dueDate: "Feb 9, 2023",
  customer: {
    zip: "20002",
    city: "Anytown",
    name: "Ron John Surfer",
    state: "KS",
    address: "123 Any Street",
    country: "United States",
  },
  lineItems: [
    {
      tax: "6%",
      item: "Surf Board",
      price: "$1,000",
      total: "$1,060.00",
      quantity: "1",
      description: "Rides big waves",
    },
    {
      tax: "6%",
      item: "Board Wax",
      price: "$75",
      total: "$159.00",
      quantity: "2",
      description: "Best wax in town",
    },
  ],
  invoiceTotal: "$1,219.00",
  invoiceNumber: "0003578",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

      {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}

      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}

      <div className="container border-t-4 border-yellow-500">
        <div className="flex flex-row justify-between my-6">
          <div className="flex">
            <img
              src="https://res.cloudinary.com/dkpz9r2q7/image/upload/v1673288813/surfsup_scqki2.png"
              className="h-20"
            />
            <div className="ml-4">
              <p className="text-3xl mb-2">Invoice</p>
              <p className="text-xl">#{order.invoiceNumber}</p>
            </div>
          </div>
          <div className="text-right text-gray-700">
            <p className="text-lg font-bold text-gray-800">Surfsup</p>
            <p>2578 Palm Tree Way</p>
            <p>Beach City, FL 30001</p>
            <p>United States</p>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between my-4">
          <div>
            <p className="uppercase text-xs text-gray-600 mb-">Bill To</p>
            <p>{order.customer.name}</p>
            <p>{order.customer.address}</p>
            <p>
              {order.customer.city}, {order.customer.state} {order.customer.zip}
            </p>
            <p>{order.customer.country}</p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <p className="uppercase text-xs text-gray-600">Invoice #</p>
              <p>{order.invoiceNumber}</p>
            </div>
            <div className="mb-2">
              <p className="uppercase text-xs text-gray-600">Date</p>
              <p>{order.date}</p>
            </div>
            <div className="mb-2">
              <p className="uppercase text-xs text-gray-600">Due Date</p>
              <p>{order.dueDate}</p>
            </div>
          </div>
        </div>
        <hr />
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 pl-0">
                Item
              </th>
              <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                Description
              </th>
              <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                Quantity
              </th>
              <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 text-right">
                Price
              </th>
              <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 text-right">
                Tax
              </th>
              <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 pr-0 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.lineItems.map((lineItem) => (
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 pl-0">
                  {lineItem.item}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {lineItem.description}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {lineItem.quantity}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                  {lineItem.price}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                  {lineItem.tax}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 pr-0 text-right">
                  {lineItem.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-between mt-20">
          <div>
            <p className="text-gray-400 text-sm mb-2">
              We accept cash, check, and card
            </p>
            <p className="text-gray-400 text-sm">Thanks for your business!</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 mb-2">Total</p>
            <p className="text-4xl font-bold text-gray-800">
              {order.invoiceTotal}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
