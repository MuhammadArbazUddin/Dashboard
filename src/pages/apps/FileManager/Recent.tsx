import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

// components
import { PopoverLayout } from '../../../components/HeadlessUI'

// style
import 'react-tooltip/dist/react-tooltip.css'
import 'animate.css'

interface RecentFileTypes {
	recentFiles: {
		name: string
		modifiedDate: string
		modifiedBy: string
		size: string
		owner: string
		members: {
			image: string
			name: string
		}[]
		previewImage: string
	}[]
}

interface ActionMenuItem {
	icon: string
	option: string
}

const actionMenuItems: ActionMenuItem[] = [
	{
		icon: 'ri-price-tag-3-line',
		option: 'Set a Price',
	},
	{
		icon: 'ri-lock-line',
		option: 'Lock',
	},
	{
		icon: 'ri-folder-add-line',
		option: 'Move to Folder',
	},
	{
		icon: 'ri-file-copy-line',
		option: 'Duplicate',
	},
]

const Recent = ({ recentFiles }: RecentFileTypes) => {
	const PopoverToggle = () => <i className="ri-more-2-fill"></i>

	return (
		<div className="mt-10">
			<h5 className="text-3xl mb-8 font-bold text-gray-800 flex items-center">Recent Files</h5>
			<div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
				<div className="col-span-2 overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden border border-gray-200 rounded-2xl shadow-md relative">
							<table className="min-w-full bg-white">
								<thead className="bg-[#EA7349]">
									<tr className="text-white">
										<th scope="col" className="p-4 text-base text-start font-semibold">
											File Name
										</th>
										<th scope="col" className="p-4 text-base text-start font-semibold">
											Created At
										</th>
										<th scope="col" className="p-4 text-base text-start font-semibold">
											File Size
										</th>
										<th scope="col" className="p-4 text-base text-center pr-[60px] font-semibold">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{(recentFiles || []).map((file, idx) => (
										<tr key={idx} className="border-b hover:bg-gray-50 transition duration-300 ease-in-out">
											<td className="p-6 text-base text-gray-800 whitespace-nowrap flex items-center space-x-4">
												<img src="https://images.unsplash.com/photo-1642388813992-f12b04ba3db0?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Preview" className="h-14 w-14 rounded-xl object-cover shadow-md animate__animated animate__fadeIn" />
												<div className="flex items-center space-x-2">
													<Link to="" className="font-semibold text-gray-800 hover:text-[#EA7349] transition duration-300">
														{file.name}
													</Link>
													<button className="text-gray-600 hover:text-[#EA7349] transition duration-300">
														<i className="ri-pencil-line text-xl"></i>
													</button>
												</div>
											</td>
											<td className="p-6 text-base text-gray-600 whitespace-nowrap">
												<p>{file.modifiedDate}</p>
												<span className="text-sm text-gray-500">by {file.modifiedBy}</span>
											</td>
											<td className="p-6 text-base text-gray-600 whitespace-nowrap">{file.size}</td>
											<td className="p-6 text-base text-gray-600 whitespace-nowrap flex items-center space-x-4 justify-center relative">
												<button className="text-gray-600 hover:text-[#EA7349] transition duration-300">
													<i className="ri-download-line text-2xl"></i>
												</button>
												<button className="text-gray-600 hover:text-red-600 transition duration-300">
													<i className="ri-delete-bin-line text-2xl"></i>
												</button>
												<button className="text-gray-600 hover:text-green-600 transition duration-300">
													<i className="ri-share-line text-2xl"></i>
												</button>
												<PopoverLayout placement={idx >= recentFiles.length - 2 ? 'top-end' : 'bottom-end'} toggler={<PopoverToggle />} togglerClass="btn bg-light px-2 py-1 rounded-full text-gray-600 focus:outline-none focus:bg-[#EA7349] focus:text-white hover:text-gray-800 transition duration-300">
													<div className="min-w-48 z-50 transition-all duration-300 bg-white shadow-lg border border-gray-200 rounded-lg py-2 overflow-visible">
														{(actionMenuItems || []).map((item, idx) => (
															<Link key={idx} className="flex w-full items-center py-2 px-6 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-300" to="">
																<i className={`${item.icon} mr-3 text-lg text-[#EA7349]`}></i>
																<span>{item.option}</span>
															</Link>
														))}
													</div>
												</PopoverLayout>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Recent
