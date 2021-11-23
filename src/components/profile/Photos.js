import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { HeartIcon } from "@heroicons/react/solid";
import { ChatIcon } from "@heroicons/react/outline";

function Photos({ photos }) {
	return (
		<>
			<div className="h-16 mt-7 flex justify-center">
				<div className="grid grid-cols-3 gap-1 md:gap-2 mt-4">
					{!photos ? (
						<>
							<Skeleton count={1} width={320} height={400} />
						</>
					) : photos.length > 0 ? (
						photos.map((photo) => (
							<div
								key={photo.docId}
								className="relative group flex"
							>
								<img
									className="object-cover w-full bg-white border border-gray-primary"
									src={photo.imageSrc}
									alt={photo.caption}
								/>
								<div
									className="absolute bottom-0 left-0 bg-gray-200 w-full z-10 
							justify-evenly items-center h-full bg-black-faded group-hover:flex hidden"
								>
									<p className="flex items-center text-white font-semibold">
										<HeartIcon className="w-6 mr-1 md:w-8 md:mr-4" />
										{photo.likes.length}
									</p>
									<p className="flex items-center text-white font-semibold">
										<ChatIcon className="w-6 mr-1 md:w-8 md:mr-4" />
										{photo.comments.length}
									</p>
								</div>
							</div>
						))
					) : null}
				</div>
			</div>
			<div className="flex justify-center -mt-5">
				{!photos ||
					(photos.length === 0 && (
						<p className="text-xl">No posts yet</p>
					))}
			</div>
		</>
	);
}

export default Photos;

Photos.propTypes = {
	photos: PropTypes.array.isRequired,
};
