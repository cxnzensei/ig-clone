import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

function Timeline() {
	const { photos } = usePhotos();
	return (
		<div className="container px-3 col-span-3 md:col-span-2 mb-5">
			{!photos ? (
				<>
					<Skeleton count={4} height={500} className="mb-5" />
				</>
			) : photos?.length > 0 ? (
				photos.map((content) => (
					<Post key={content.docId} content={content} />
				))
			) : (
				<p className="text-center text-2xl">
					Follow people to see photos!
				</p>
			)}
		</div>
	);
}

export default Timeline;
