const formatDate = (dateFromMongoose) => {
  const date = new Date(dateFromMongoose);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  return formattedDate;
};

export default formatDate;
