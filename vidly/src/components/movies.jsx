import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
    state = {
        movies: getMovies(),
        movieCount: getMovies().length
    };

    handleDelete = movieId => {
        const newState = this.state;
        const index = newState.movies.findIndex(a => a._id === movieId);
        if (index === -1) return;
        newState.movies.splice(index, 1);
        newState.movieCount--;
        this.setState(newState);
    };

    showNumberOfMovies = number => {
        let moviesCountDisplay = "There are ";
        moviesCountDisplay += number === 0 ? "no" : number;
        return moviesCountDisplay + " movies in the database.";
    };

    render() {
        return (
            <React.Fragment>
                <span>{this.showNumberOfMovies(this.state.movieCount)}</span>
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th className="col-md-3">Title</th>
                            <th className="col-md-2">Genre</th>
                            <th className="col-md-2">Stock</th>
                            <th className="col-md-2">Rate</th>
                            <th className="col-md-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => {
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
                                    <td className="col-md-3">
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
            </React.Fragment>
        );
    }
}

export default Movies;
