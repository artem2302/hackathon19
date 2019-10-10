import mongoose from "mongoose";

const Company = mongoose.model("Company");

async function create(req, res) {
    let company = new Company(req.body);
    await company.save();
    return res.json({
        error: false,
        model: company
    });
}

async function update(req, res) {
    let company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404)
            .json({
                error: true,
                message: "Company not found"
            });
    }
    Object.keys(req.body).forEach(key => {
        company[key] = req.body[key];
    });
    await company.save();
    return res.json({
        error: false,
        model: company
    });
}

async function remove(req, res) {
    let company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404)
            .json({
                error: true,
                message: "Company not found"
            });
    }
    await company.remove();
    return res.json({
        error: false
    });
}

async function all(req, res) {
    const regex = new RegExp(`.*${req.query.name}.*`, "i");
    let companies = await Company.find({ name: regex });
    if (!companies || !companies.length) {
        return res.status(404)
            .json({
                error: true,
                message: "Companies not found"
            });
    }
    return res.json({
        error: false,
        model: companies
    });
}

async function load(req, res) {
    let company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404)
            .json({
                error: true,
                message: "Company not found"
            });
    }
    return res.json({
        error: false,
        model: company
    });
}

export default {
    create,
    update,
    remove,
    all,
    load
}