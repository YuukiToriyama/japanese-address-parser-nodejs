use japanese_address_parser::experimental::parser::{DataSource, Parser};
use napi_derive::napi;

#[napi(js_name = "Parser")]
pub struct JsParser {
    parser: Parser,
}

#[napi(object)]
pub struct ParserOptions {
    pub data_source: String,
    pub correct_incomplete_city_names: bool,
    pub verbose: bool,
}

#[napi(object)]
pub struct ParsedAddress {
    pub prefecture: String,
    pub city: String,
    pub town: String,
    pub rest: String,
    pub metadata: Metadata,
}

#[napi(object)]
pub struct Metadata {
    pub latitude: Option<f64>,
    pub longitude: Option<f64>,
    pub depth: u8,
}

#[napi]
impl JsParser {
    #[napi(constructor)]
    pub fn new() -> Self {
        JsParser {
            parser: Parser::default(),
        }
    }

    #[napi(factory)]
    pub fn init_with_options(options: ParserOptions) -> Self {
        JsParser {
            parser: Parser {
                options: japanese_address_parser::experimental::parser::ParserOptions {
                    data_source: match options.data_source.as_str() {
                        "ChimeiRuiju" => DataSource::ChimeiRuiju,
                        _ => DataSource::Geolonia,
                    },
                    correct_incomplete_city_names: options.correct_incomplete_city_names,
                    verbose: options.verbose,
                },
            },
        }
    }

    #[napi]
    pub async fn parse(&self, input: String) -> napi::Result<ParsedAddress> {
        let result = self.parser.parse(&input).await;
        Ok(ParsedAddress {
            prefecture: result.prefecture,
            city: result.city,
            town: result.town,
            rest: result.rest,
            metadata: Metadata {
                latitude: result.metadata.latitude,
                longitude: result.metadata.longitude,
                depth: result.metadata.depth,
            },
        })
    }
}
