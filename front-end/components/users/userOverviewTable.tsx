import React from 'react';

const UserOverviewTable: React.FC = () => {
    return (
        <>
            <h1 className = "text-center text-3xl m-4">Users</h1>
            <section className="flex justify-center items-center py-8">
                <table className="table-auto w-1/3 border border-collapse border-gray-700">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                            <th scope="col" className="px-4 py-2 text-left border-b">Username</th>
                            <th scope="col" className="px-4 py-2 text-left border-b">Password</th>
                            <th scope="col" className="px-4 py-2 text-left border-b">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="data-row">
                            <td className="border px-4 py-2">doctor</td>
                            <td className="border px-4 py-2">doctor123</td>
                            <td className="border px-4 py-2">doctor</td>
                        </tr>
                        <tr className="data-row">
                            <td className="border px-4 py-2">patient</td>
                            <td className="border px-4 py-2">patient123</td>
                            <td className="border px-4 py-2">patient</td>
                        </tr>
                        <tr className="data-row">
                            <td className="border px-4 py-2">admin</td>
                            <td className="border px-4 py-2">admin123</td>
                            <td className="border px-4 py-2">admin</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default UserOverviewTable;
