import React from "react";

function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-900">
            <h3 className="text-center py-8 font-semibold text-5xl text-white">
                Transaction History
            </h3>

            <section className="relative py-5 bg-blueGray-50">
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900 text-white">
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="w-auto px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
                                            No
                                        </th>
                                        <th className="w-2/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
                                            Customer
                                        </th>
                                        <th className="w-2/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
                                            Status
                                        </th>
                                        <th className="w-2/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
                                            Budget
                                        </th>
                                        <th className="w-4/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
                                            Description
                                        </th>
                                        <th className="w-2/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            1
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <b>Argon Design System</b>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-green-400">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            $2,500 USD
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            This is ICO, DEX project.
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button>Dispute</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div className="px-5">
                <button className="p-3 bg-green-300 rounded-md">
                    Make Invoice
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
