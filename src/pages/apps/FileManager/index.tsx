import { useState, useEffect, useRef } from 'react'
import { FaDownload, FaTrashAlt, FaShareAlt, FaEllipsisV, FaFileAlt, FaTag, FaClone, FaFolder, FaLock, FaEdit } from 'react-icons/fa'
import Recent from './Recent'
import LeftPanel from './LeftPanel'
import { useViewPort } from '../../../hooks'

// components
import { PageBreadcrumb } from '../../../components'
import { OffcanvasLayout } from '../../../components/HeadlessUI'

// data
import { recentFiles } from './data'

// Define RecentFileTypes
interface RecentFileTypes {
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
}

const FileManagerApp = () => {
	const [leftPanelOpen, setLeftPanelOpen] = useState(false)
	const { width } = useViewPort()

	const handleLeftPanel = () => {
		setLeftPanelOpen(!leftPanelOpen)
	}

	const [dropdownOpen, setDropdownOpen] = useState<number | null>(null) // Type `dropdownOpen` as a number or null
	const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]) // Type `dropdownRefs` correctly

	const toggleDropdown = (id: number) => {
		setDropdownOpen(dropdownOpen === id ? null : id)
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownOpen !== null && dropdownRefs.current[dropdownOpen] && !dropdownRefs.current[dropdownOpen]?.contains(event.target as Node)) {
				setDropdownOpen(null)
			}
		}

		// Add event listener
		document.addEventListener('mousedown', handleClickOutside)

		// Clean up the event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dropdownOpen])

	return (
		<>
			<PageBreadcrumb title="File Manager" subName="Apps" />
			<div className="lg:flex gap-2">
				{width >= 1024 ? (
					<div className="lg:block hidden inset-y-0 start-0 transform h-full min-h-full min-w-72 lg:z-0 z-50 fixed lg:static lg:translate-x-0 -translate-x-full transition-all duration-300 lg:rtl:-translate-x-0 rtl:translate-x-full" tabIndex={-1}>
						<LeftPanel />
					</div>
				) : (
					<OffcanvasLayout open={leftPanelOpen} toggleOffcanvas={handleLeftPanel} placement="start" sizeClassName="w-64 max-w-[16rem]">
						<LeftPanel />
					</OffcanvasLayout>
				)}

				<div className="card p-6 w-full">
					<div className="flex flex-wrap justify-between items-center gap-4">
						<div className="flex items-center gap-4">
							<div className="lg:hidden block">
								<button className="inline-flex items-center justify-center text-gray-700 border border-gray-200 rounded hover:bg-slate-100 dark:text-gray-400 hover:dark:bg-gray-800 dark:border-gray-600 transition h-9 w-9 duration-100" onClick={handleLeftPanel}>
									<div className="ri-menu-2-fill text-lg"></div>
								</button>
							</div>
							<h1 className="text-3xl font-bold text-gray-800">Folders</h1>
						</div>
					</div>

					{/* Folders Section */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
						{['Project Details', 'Meetings with a Client', 'Financial Reports'].map((title, index) => (
							<div key={index} className="card p-6 relative min-h-64 shadow-lg border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition-all duration-300" ref={(el) => (dropdownRefs.current[index] = el)}>
								<div className="flex items-center mb-6">
									<div className="bg-[#EA7349] p-4 rounded-full flex items-center justify-center">
										<FaFileAlt className="text-white text-2xl" /> {/* Icon with theme color and background */}
									</div>
									<h5 className="card-title text-2xl font-semibold text-gray-800 ml-4">{title}</h5> {/* Title with more spacing */}
								</div>
								<button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg" onClick={() => toggleDropdown(index)}>
									<FaEllipsisV />
								</button>
								{dropdownOpen === index && (
									<div className="absolute top-12 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-48 p-3 z-10">
										<div className="flex items-center mb-3 cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" onClick={() => setDropdownOpen(null)}>
											<FaTag className="mr-2 text-lg text-[#EA7349]" /> {/* Enhanced icon with theme color */}
											<span className="text-sm">Set a Price</span>
										</div>
										<div className="flex items-center mb-3 cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" onClick={() => setDropdownOpen(null)}>
											<FaFolder className="mr-2 text-lg text-[#EA7349]" />
											<span className="text-sm">Move to Folder</span>
										</div>
										<div className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" onClick={() => setDropdownOpen(null)}>
											<FaClone className="mr-2 text-lg text-[#EA7349]" />
											<span className="text-sm">Duplicate</span>
										</div>
									</div>
								)}
								<div className="flex flex-col gap-2 mt-6 text-base">
									<p className="text-[#EA7349] font-semibold cursor-pointer hover:underline transition-all duration-200">Project Plan</p> {/* Enhanced text color and added hover effect */}
									<p className="text-gray-500">25 Files • 250 MB</p>
								</div>
								<div className="flex items-center space-x-6 mt-8">
									<button className="flex items-center text-gray-600 hover:text-[#EA7349] text-lg transition-colors duration-200" title="Edit">
										<FaEdit className="mr-2" />
									</button>
									<button className="flex items-center text-gray-600 hover:text-[#EA7349] text-lg transition-colors duration-200" title="Download">
										<FaDownload className="mr-2" />
									</button>
									<button className="flex items-center text-gray-600 hover:text-[#EA7349] text-lg transition-colors duration-200" title="Delete">
										<FaTrashAlt className="mr-2" />
									</button>
									<button className="flex items-center text-gray-600 hover:text-[#EA7349] text-lg transition-colors duration-200" title="Share">
										<FaShareAlt className="mr-2" />
									</button>
									<button className="flex items-center text-gray-600 hover:text-[#EA7349] text-lg transition-colors duration-200" title="Lock">
										<FaLock className="mr-2" />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Recent Section */}
					<Recent recentFiles={recentFiles as RecentFileTypes[]} />
				</div>
			</div>
		</>
	)
}

export default FileManagerApp
