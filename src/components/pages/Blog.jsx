import React, { useState } from 'react';
import { Flex, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Avatar, Heading, Text, Card, CardHeader, CardBody, CardFooter, IconButton, Image, useToast, useDisclosure, extendTheme, ChakraProvider, VStack, HStack, Icon } from '@chakra-ui/react';
import { BsThreeDotsVertical, BsTrash, BsPencil } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { Global, css } from '@emotion/react';

// Extend the default theme with custom global styles
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.800',
        lineHeight: 'tall',
      },
      '.fixed-button': {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      },
      'body': {
        background: 'linear-gradient(370deg, #6f13ad 0%, #010132 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientBG 15s ease infinite',
      },
    },
  },
});

const keyframes = css`
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Default Post",
      content: "This is a default post with only text.",
      image: null,
      userName: "John Doe",
      likes: 10,
      comments: [
        { id: 1, userName: "Jane Smith", content: "This is a default comment." }
      ]
    }
  ]);
  const [editedPost, setEditedPost] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
  const [newComment, setNewComment] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditPost = (post) => {
    setEditedPost(post);
    onOpen();
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({ title: "Post deleted successfully.", status: "error", duration: 3000, isClosable: true });
  };

  const handleSavePost = () => {
    if (editedPost) {
      setPosts(prevPosts => prevPosts.map(p => (p.id === editedPost.id ? editedPost : p)));
      toast({ title: "Post edited successfully.", status: "success", duration: 3000, isClosable: true });
    } else {
      const newId = Math.max(...posts.map(post => post.id)) + 1;
      setPosts(prevPosts => [...prevPosts, { ...newPost, id: newId, userName: "New User", likes: 0, comments: [] }]);
      toast({ title: "Post added successfully.", status: "success", duration: 3000, isClosable: true });
    }
    onClose();
  };

  const handleEditComment = (postId, comment) => {
    setCommentToEdit({ postId, ...comment });
    onOpen();
  };

  const handleSaveComment = () => {
    if (commentToEdit) {
      const updatedPosts = posts.map(post => {
        if (post.id === commentToEdit.postId) {
          return {
            ...post,
            comments: post.comments.map(comment => comment.id === commentToEdit.id ? { ...comment, content: newComment } : comment)
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      toast({ title: "Comment updated successfully.", status: "success", duration: 3000, isClosable: true });
      setCommentToEdit(null);
    }
    setNewComment('');
    onClose();
  };

  const handleDeleteComment = (postId, commentId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments.filter(comment => comment.id !== commentId) };
      }
      return post;
    });
    setPosts(updatedPosts);
    toast({ title: "Comment deleted successfully.", status: "info", duration: 3000, isClosable: true });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost(prevState => ({ ...prevState, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  let isCommentOpen;
  return (
      <ChakraProvider theme={theme}>
        <Global styles={keyframes} />
        <Flex align="center" justify="center" minHeight="100vh" className="content" padding="10rem">
          <Box>
            <Button position="relative" onClick={() => { setEditedPost(null); setNewPost({ title: "", content: "", image: null }); onOpen(); }} colorScheme="teal" mb={4} className="fixed-button">
              Add New Post
            </Button>
            {posts.map(post => (
                <Card key={post.id} bg="white" p="5" rounded="md" shadow="md" m="4" maxWidth="400px" w="full">
                  <CardHeader>
                    <Flex justify='space-between'>
                      <Avatar name={post.userName} src='https://bit.ly/sage-adebayo' />
                      <Box pl={2}>
                        <Heading size='sm'>{post.userName}</Heading>
                        <Text fontSize='sm'>{post.title}</Text>
                      </Box>
                      <IconButton
                          variant='ghost'
                          aria-label='Options'
                          icon={<BsThreeDotsVertical />}
                          onClick={() => handleEditPost(post)}
                      />
                      <IconButton
                          variant='ghost'
                          aria-label='Delete'
                          icon={<BsTrash />}
                          onClick={() => handleDeletePost(post.id)}
                      />
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>{post.content}</Text>
                  </CardBody>
                  {post.image && <Image objectFit='cover' src={post.image} alt={post.title} />}
                  <CardFooter>
                    <Button variant='ghost' leftIcon={<BiLike />}>Like</Button>
                    <Button variant='ghost' leftIcon={<BiChat />}>Comment</Button>
                    <Button variant='ghost' leftIcon={<BiShare />}>Share</Button>
                  </CardFooter>
                  <VStack spacing={3} align="stretch">
                    {post.comments.map(comment => (
                        <Box key={comment.id} bg="gray.100" p="3" rounded="md">
                          <Flex justify="space-between">
                            <Text fontWeight="bold">{comment.userName}</Text>
                            <HStack>
                              <IconButton
                                  aria-label="Edit comment"
                                  icon={<BsPencil />}
                                  variant="ghost"
                                  onClick={() => handleEditComment(post.id, comment)}
                              />
                              <IconButton
                                  aria-label="Delete comment"
                                  icon={<BsTrash />}
                                  variant="ghost"
                                  onClick={() => handleDeleteComment(post.id, comment.id)}
                              />
                            </HStack>
                          </Flex>
                          <Text>{comment.content}</Text>
                        </Box>
                    ))}
                  </VStack>
                </Card>
            ))}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{editedPost ? "Edit Post" : "Add New Post"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input placeholder="Post Title" mb={3} value={editedPost ? editedPost.title : newPost.title} onChange={(e) => { if (editedPost) setEditedPost(prevState => ({ ...prevState, title: e.target.value })); else setNewPost(prevState => ({ ...prevState, title: e.target.value })); }} />
                  <Input placeholder="Post Content" mb={3} value={editedPost ? editedPost.content : newPost.content} onChange={(e) => { if (editedPost) setEditedPost(prevState => ({ ...prevState, content: e.target.value })); else setNewPost(prevState => ({ ...prevState, content: e.target.value })); }} />
                  <Input type="file" onChange={handleImageUpload} />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSavePost}>Save</Button>
                  <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal isOpen={isCommentOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{commentToEdit ? "Edit Comment" : "Add New Comment"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input placeholder="Comment Content" mb={3} value={commentToEdit ? commentToEdit.content : newComment} onChange={(e) => { if (commentToEdit) setCommentToEdit(prevState => ({ ...prevState, content: e.target.value })); else setNewComment(e.target.value); }} />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSaveComment}>Save</Button>
                  <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Flex>

      </ChakraProvider>
  );
};

export default Blog;
