# Package Management

Python uses virtual environment to create a virtually isolated environment for a project. This environment contains all the packages and libraries the project needs which need to be installed.

To set up a virtual environment using `venv`.

```sh
python -m venv <venv_dir>
<venv_dir>/Scripts/activate
```

## Dependencies List

The dependencies are listed in `requirements.txt` separated by a line. They may also specify the version (`Flask==2.1.3`).

`requirements.txt`

```txt
Fabric
Flask-SQLAlchemy
Flask-WTF
WTForms
coverage
```

## Managing Dependencies

> **NOTE:** `python -m` in commands is optional but makes them more verbose.

The dependencies listed in `requirements.txt` can be installed in the virtual environment by running the following command.

```sh
python -m pip install -r requirements.txt
```

With this, all the dependencies are set up in the virtual environment and the application is ready to run.

```sh
python app.py
```

### Updating `requirements.txt`

[Dependency Tools](#dependency-tools) are recommended instead.

To update the list of packages in `requirements.txt`, they have to be manually added using the following command.

```sh
python -m pip freeze > requirements.txt
```

### Installing a New Dependency

To install a new dependency.

```sh
python -m pip install <dependency>
```

> **NOTE:** Inside a virtual environment, all installation commands will affect the virtual environment and not the global environment.

### Dependency Tools

[`pip-tools`](https://github.com/jazzband/pip-tools), [`Pipenv`](https://packaging.python.org/en/latest/key_projects/#pipenv) and [`poetry`](https://python-poetry.org/) are tools for managing application-specific dependencies. Because using `python freeze` leads to having transitive dependencies (sub dependencies) in the `requirements.txt` file. These tools help in specifying only the main dependencies.

#### `pip-tools`

`pip-tools` is installed in each project's virtual environment.

```sh
python -m pip install pip-tools
```

`pip-compile` compiles a `requirements.txt` file from a `requirements.in` file which only contains the main dependencies.

`requirements.in`

```
djlint
Flask
```

To compile a `requirements.txt` file from this, use `pip-compile`.

```sh
pip-compile
# or
python -m piptools compile
```
