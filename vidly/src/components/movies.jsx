import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        movieCount: getMovies().length,
        pageSize: 4,
        currentPage: 1
    };

    handleDelete = movieId => {
        const newState = this.state;
        const index = newState.movies.findIndex(a => a._id === movieId);
        if (index === -1) return;
        newState.movies.splice(index, 1);
        newState.movieCount--;
        this.setState(newState);
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        if (this.state.movieCount === 0)
            return <span>There are no movies in the database.</span>;

        const movies = paginate(allMovies, currentPage, pageSize);
        return (
            <React.Fragment>
                <span>
                    Showing {this.state.movieCount} movies in the database.
                </span>
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th className="col-md-3">Title</th>
                            <th className="col-md-2">Genre</th>
                            <th className="col-md-2">Stock</th>
                            <th className="col-md-2">Rate</th>
                            <th className="col-md-1" />
                            <th className="col-md-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => {
                            return (
                                <tr key={movie._id} className="row">
                                    <td className="col-md-3">{movie.title}</td>
                                    <td className="col-md-2">
                                        {movie.genre.name}
                                    </td>
                                    <td className="col-md-2">
                                        {movie.numberInStock}
                                    </td>
                                    <td className="col-md-2">
                                        {movie.dailyRentalRate}
                                    </td>
                                    <td>
                                        <Like
                                            liked={movie.liked}
                                            onClick={() => {
                                                this.handleLike(movie);
                                            }}
                                        />
                                    </td>
                                    <td className="col-md-2">
                                        <button
                                            onClick={() => {
                                                this.handleDelete(movie._id);
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export default Movies;
