import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../components/Blog/BlogData';
import './blogDetail.css'

const BlogDetail = () => {
  const { id } = useParams();

  // Filter blog data based on id (convert id to string for comparison)
  const filteredBlog = blogData.filter(bG => bG.id === Number(id)); // Convert id to number for comparison

  // Check the filtered result
  useEffect(() => {
    if (filteredBlog.length > 0) {
      console.log("Filtered Blog ID:", filteredBlog[0].id); // Access the id of the first matched blog
    } else {
      console.log('No blog found with the given ID.');
    }
  }, [filteredBlog]); // Include filteredBlog in dependency array

  return (
    <div className='blogDetailContainer'>
      {filteredBlog.length > 0 ? (
        <div>
          <h1 className='d-header'>{filteredBlog[0].title}</h1>
          <img src={filteredBlog[0].image} alt={filteredBlog[0].description} />
          <p>{filteredBlog[0].description}</p>
        </div>
      ) : (
        <p>No blog found.</p>
      )}
    </div>
  );
};

export default BlogDetail;
