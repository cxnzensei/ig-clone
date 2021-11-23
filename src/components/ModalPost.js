import { Fragment, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalPostState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { storage, db } from "../lib/firebase";
import uniqid from "uniqid";
import useUser from "../hooks/use-user";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";

import { ref, getDownloadURL, uploadString } from "@firebase/storage";

export default function ModalPost() {
	const [open, setOpen] = useRecoilState(modalPostState);
	const [loading, setLoading] = useState(false);
	const filePickerRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const captionRef = useRef(null);
	const {
		// eslint-disable-next-line no-unused-vars
		user: { docId, fullName, username, userId, following },
	} = useUser();

	const uploadPost = async () => {
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, "photos"), {
			caption: captionRef.current.value,
			comments: [],
			dateCreated: Date.now(),
			likes: [],
			photoId: uniqid(),
			userId: userId,
		});

		const imageRef = ref(storage, `photos/${docRef.id}/imageSrc`);
		await uploadString(imageRef, selectedFile, "data_url").then(
			async (snapshot) => {
				const downloadURL = await getDownloadURL(imageRef);
				await updateDoc(doc(db, "photos", docRef.id), {
					imageSrc: downloadURL,
				});
			}
		);

		setOpen(false);
		setLoading(false);
		setSelectedFile(null);
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto mt-32 md:mt-0"
				onClose={setOpen}
			>
				<div
					className="flex items-center justify-center min-h-[800px]
				sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-background bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translaye-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
						overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm
						sm:w-full sm:p-6"
						>
							<div>
								{selectedFile ? (
									<img
										src={selectedFile}
										className="w-full object-contain cursor-pointer"
										onClick={() => setSelectedFile(null)}
										alt=""
									/>
								) : (
									<div
										onClick={() =>
											filePickerRef.current.click()
										}
										className="mx-auto flex items-center cursor-pointer justify-center h-12 w-12 rounded-full bg-gray-primary"
									>
										<CameraIcon
											className="h-6 w-6 text-red-primary"
											aria-hidden="true"
										/>
									</div>
								)}
								<div>
									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-sm md:text-lg leading-6 font-medium text-black-light"
										>
											Upload a photo
										</Dialog.Title>
									</div>
									<div>
										<input
											ref={filePickerRef}
											type="file"
											hidden
											onChange={addImageToPost}
										/>
									</div>
									<div className="mt-2">
										<input
											className="border outline-none text-sm md:text-lg border-gray-primary p-2 mt-1 focus:ring-0 w-full text-center"
											type="text"
											ref={captionRef}
											placeholder="Add a caption"
										/>
									</div>
								</div>
								<div className="mt-3">
									<button
										onClick={uploadPost}
										type="button"
										disabled={!selectedFile}
										className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4
										py-2 bg-red-primary text-xs md:text-base font-medium text-white hover:bg-red-primary focus:outline-none
										focus:ring-2 focus:ring-offset-2 focus:ring-red-primary ${!selectedFile}:bg-black-light
										${!selectedFile}:cursor-not-allowed ${!selectedFile}:hover:bg-gray-base`}
									>
										{loading ? "Uploading" : "Upload Post"}
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
