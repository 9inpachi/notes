# Gradle

A build automation tool designed to build almost any type of software.

<https://docs.gradle.org/>

## Things to know

1. Gradle is a general-purpose build tool.
2. The core model of gradle is based on tasks.
   - The builds are modeled as Directed Acyclic Graphs of task (units of work) based on the dependencies between the tasks.
   - Tasks themselves consist of:
     - Actions: pieces of work that do something, like compile source.
     - Inputs: values, files and directories that the action uses.
     - Outputs: files and directories that the actions modify or generate.
3. Gradle has some fixed build phases.
   1. Initialization
      Set up the environment for build and determine projects to include,
   2. Configuration
      Constructs and configures the task graph for build based on the task the user wants to run.
   3. Execution
      Runs the tasks selected by the configuration phase.
4. Gradle is extensible in more ways than one.
5. Build scripts operate against an API (not REST).
    It's easy to view Gradle's build scripts as executable code. It's useful in understanding how the build script syntax maps to Gradle's API.
