//     fs is a Node.js module that lets you read files from the file system.

// path is a Node.js module that lets you manipulate file paths.

// matter is a library that lets you parse the metadata in each markdown file.

// In Next.js, the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils.


import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';



const postsDirectory = path.join(process.cwd(), 'posts');



export function getSortedPostsData() {

	// Get file names under /posts
	
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');


		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');


		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);


		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});


	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}


// getAllPostIds function returns the list of file names in the posts directory.
export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);
		return fileNames.map((fileName) => {
			return {
				params: {
					id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

//!! Important: The returned list is not just an array of strings — it must be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.

// This function will return the post data, based on id

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();


	// Combine the data with the id
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}


