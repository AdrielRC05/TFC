# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

from recommonmark.parser import CommonMarkParser

# Añadir esto si no está:
extensions = [
    'myst_parser',  # para soportar archivos Markdown
]

source_parsers = {
    '.md': CommonMarkParser,
}

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

project = 'TFC Adriel Ruano Campos'
copyright = '2025, Adriel Ruano Campos'
author = 'Adriel Ruano Campos'
release = '01/06/2025'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
