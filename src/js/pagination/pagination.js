class Pagination {
  constructor({
    itemsPerPage,
    currentPage,
    totalItems,
    container,
    onPageChange,
  }) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;
    this.totalItems = totalItems;
    this.container = container;
    this.onPageChange = onPageChange;
    this.render();
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  render() {
    const pagination = document.createElement('ul');
    pagination.className = 'pagination';

    // Render previous page link
    const previousLink = document.createElement('li');
    previousLink.innerHTML = `<a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
    previousLink.addEventListener('click', event => {
      event.preventDefault();
      this.goToPage(this.currentPage - 1);
    });
    if (this.currentPage === 1) {
      previousLink.classList.add('disabled');
    }
    pagination.appendChild(previousLink);

    // Render page links
    for (let i = 1; i <= this.totalPages; i++) {
      const pageLink = document.createElement('li');
      pageLink.innerHTML = `<a href="#">${i}</a>`;
      pageLink.addEventListener('click', event => {
        event.preventDefault();
        this.goToPage(i);
      });
      if (i === this.currentPage) {
        pageLink.classList.add('active');
      }
      pagination.appendChild(pageLink);
    }

    // Render next page link
    const nextLink = document.createElement('li');
    nextLink.innerHTML = `<a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
    nextLink.addEventListener('click', event => {
      event.preventDefault();
      this.goToPage(this.currentPage + 1);
    });
    if (this.currentPage === this.totalPages) {
      nextLink.classList.add('disabled');
    }
    pagination.appendChild(nextLink);

    // Append pagination to container
    this.container.innerHTML = '';
    this.container.appendChild(pagination);
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.render();
    this.onPageChange(this.currentPage);
  }
}
