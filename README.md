# Create Shift Register


## Getting started

Install clasp

`npm i @google/clasp -g`

Login

`clasp login`

This will create a `~/.clasprc.json` file, copy the contents to the secret in github project `CLASPRC_JSON`



## CI
Uses Github actions, follow these conventions to run the pipeline and run an automatic deployment:
```bash
  feat/**
  bug/**
  chore/**
  docs/**
```